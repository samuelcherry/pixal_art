package main

import (
	"bufio"
	"fmt"
	"image"
	"image/color"
	_ "image/jpeg"
	"image/png"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"strconv"
	"strings"
	"time"
)

var inputFile string

func init() {

	dir := "./images"
	entries, err := os.ReadDir(dir)
	if err != nil {
		fmt.Printf("Error reading directoryL %v\n", err)
		return
	}
	fmt.Println("function starts at: ", dir)
	if inputFile == "" {
		if len(entries) == 0 {
			fmt.Println("dir not empty")

			inputDir := "./input"

			files,err := os.ReadDir(inputDir)
			if err != nil {
				log.Fatal(err)
			}


			for _, f := range files {
				if !f.IsDir() {
					inputFile = filepath.Join(inputDir, f.Name())
					break
				}
			}

			if inputFile == "" {
				log.Fatal("No input video fount in ./input folder")
			}

//change resolution of images to be 1920x1080
			cmd := exec.Command(
			"C:/ffmpeg/bin/ffmpeg.exe",
			"-i", inputFile,
			"-vf", "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2",
			"./images/%04d.png",
			)

			// FFmpeg sends percent to stderr
			stderr, err := cmd.StderrPipe()
			if err != nil {
				log.Fatal(err)
			}

			if err := cmd.Start(); err != nil {
				log.Fatal(err)
			}

			scanner := bufio.NewScanner(stderr)
			frameRe := regexp.MustCompile(`frame=\s*(\d+)`)

			fmt.Println("Extracting frames...")

			for scanner.Scan() {
				line := scanner.Text()
				if matches := frameRe.FindStringSubmatch(line); matches != nil {
					frameNum, _ := strconv.Atoi(matches[1])
					fmt.Printf("\rFrames processed: %d", frameNum)
				}
			}

			if err != nil {
				log.Fatal(err)
			}

			fmt.Println("\nDone!")
		}
	}else{
		log.Fatal("No input file")
	}
}

func main() {
//input dir, output dir
	dir := "C:/Users/samue/Desktop/go_projects/pixal_art/images"
	newDir := "C:/Users/samue/Desktop/go_projects/pixal_art/colorBlocks"

	entries, err := os.ReadDir(dir)
	if err != nil{
		log.Fatal(err)
	}

	newEntries, err := os.ReadDir(newDir)
	if err != nil {
		log.Fatal(err)
	}
	
	if len(newEntries) == 0{
		for index, entry := range entries {

			if entry.IsDir() {
				continue
			}

			inputFile := filepath.Join(dir, entry.Name())
			f, err := os.Open(inputFile)
			if err != nil {
				log.Fatal("Could not open input.jpg:", err)
			}
			defer f.Close()

			img, _, err := image.Decode(f)
			if err != nil {
				log.Fatal("Image decode failed:", err)
			}
//loop through array of resolutions [256,192,128,64,32,4]
			res := 4

			width := img.Bounds().Dx()
			height := img.Bounds().Dy()

			gridX := width/res
			gridY := height/res

			cellW := width/gridX
			cellH := height/gridY

			out := image.NewRGBA(image.Rect(0,0,width,height))

			for gy := range gridY {
				for gx := range gridX{

					startX := gx * cellW
					startY := gy * cellH
					endX := startX + cellW
					endY := startY + cellH

					var rSum, gSum, bSum uint64
					var count uint64

					for y:=startY; y < endY; y++{
						for x:= startX; x < endX; x++{
							r,g,b,_ := img.At(x,y).RGBA()
							rSum += uint64(r)
							gSum += uint64(g)
							bSum += uint64(b)
							count++
						}
					}

					avgColor := color.RGBA{
						uint8((rSum/count) >> 8),
						uint8((gSum/count) >> 8),
						uint8((bSum/count) >> 8),
						255,
					}

					for y := startY; y < endY; y++ {
						for x := startX; x < endX; x++ {
							out.Set(x,y,avgColor)
						}
					}
				}
			}

			newImageName := fmt.Sprintf("%04d.png", index)
			newImagePath := filepath.Join(newDir, newImageName)

			
			outFile, _ := os.Create(newImagePath)
			defer outFile.Close()

			png.Encode(outFile, out)

			percent := int(float64(index)/float64(len(entries))*100)

			fmt.Printf("%d%%\n", percent)
			time.Sleep(50 * time.Millisecond)
		}
		fmt.Println("\nDone!")
	}
	fmt.Println("\nExporting Video!")

	base := filepath.Base(inputFile)

		
	fmt.Println("base string:", base)

	name := strings.TrimSuffix(base, filepath.Ext(base))

	fmt.Println("base string:", base)

	outputPath := filepath.Join("./output", fmt.Sprintf("%s_4res.gif", name))

	cmd := exec.Command(
	"C:/ffmpeg/bin/ffmpeg.exe",
	"-framerate", "24",
	"-i", "colorBlocks/%04d.png",
	outputPath,
	)
//2874 - 3328
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Start(); err != nil {
		log.Fatal(err)
	}

	if err := cmd.Wait(); err != nil {
		log.Fatal(err)
	}

	os.RemoveAll("./colorBlocks")
	os.Mkdir("./colorBlocks", 0755)

	fmt.Println("\nFinished Exporting!")

}


