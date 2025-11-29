package main

import (
	"fmt"
	"image"
	"image/color"
	_ "image/jpeg"
	"image/png"
	"log"
	"os"
	"path/filepath"
)



func main() {

	dir := "./images"
	newDir := "./colorBlocks"

	entries, err := os.ReadDir(dir)
	if err != nil{
		log.Fatal(err)
	}
	i := 0
	for _, entry := range entries {

		if entry.IsDir() {
			continue
		}

		i++

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

		res := 64

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

		newImageName := fmt.Sprintf("%04d.png", i)
		newImagePath := filepath.Join(newDir, newImageName)

		outFile, _ := os.Create(newImagePath)
		defer outFile.Close()

		png.Encode(outFile, out)
	}
}
