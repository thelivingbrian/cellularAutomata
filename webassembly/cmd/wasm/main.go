package main

const BOARD_SIZE_PIXELS int = 20

/* We want to have 20 pixels by 20 pixels. And 4 colors per pixel (r,g,b,a)
* Which, the Canvas API Supports.
 */
const BOARD_BUFFER_SIZE int = BOARD_SIZE_PIXELS * BOARD_SIZE_PIXELS * 4

var graphicsBuffer [BOARD_BUFFER_SIZE]uint8

func main() {}

func getGraphicsBufferPointer() *[BOARD_BUFFER_SIZE]uint8 {
	return &graphicsBuffer
}

func getGraphicsBufferSize() int {
	return BOARD_BUFFER_SIZE
}
func generateCheckerBoard(
	darkValueRed uint8,
	darkValueGreen uint8,
	darkValueBlue uint8,
	lightValueRed uint8,
	lightValueGreen uint8,
	lightValueBlue uint8,
) {
	// Since Linear memory is a 1 dimensional array, but we want a grid
	// we will be doing 2d to 1d mapping
	// https://softwareengineering.stackexchange.com/questions/212808/treating-a-1d-data-structure-as-2d-grid
	for y := 0; y < BOARD_SIZE_PIXELS; y++ {
		for x := 0; x < BOARD_SIZE_PIXELS; x++ {
			// Set our default case to be dark squares
			isDarkSquare := true

			// We should change our default case if
			// We are on an odd y
			if y%2 == 0 {
				isDarkSquare = false
			}

			// Lastly, alternate on our x value
			if x%2 == 0 {
				isDarkSquare = !isDarkSquare
			}

			// Now that we determined if we are dark or light,
			// Let's set our square value
			squareValueRed := darkValueRed
			squareValueGreen := darkValueGreen
			squareValueBlue := darkValueBlue
			if !isDarkSquare {
				squareValueRed = lightValueRed
				squareValueGreen = lightValueGreen
				squareValueBlue = lightValueBlue
			}

			// Let's calculate our index, using our 2d -> 1d mapping.
			// And then multiple by 4, for each pixel property (r,g,b,a).
			squareNumber := (y * BOARD_SIZE_PIXELS) + x
			squareRgbaIndex := squareNumber * 4

			graphicsBuffer[squareRgbaIndex+0] = squareValueRed   // Red
			graphicsBuffer[squareRgbaIndex+1] = squareValueGreen // Green
			graphicsBuffer[squareRgbaIndex+2] = squareValueBlue  // Blue
			graphicsBuffer[squareRgbaIndex+3] = 255              // Alpha (Always Opaque)
		}
	}
}
