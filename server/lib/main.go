package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("Attempting to start server...")
	// must execute from root dir - todo:  make less fragile
	err := http.ListenAndServe(":9090", http.FileServer(http.Dir("./grid-app/dist/grid-app/browser")))
	if err != nil {
		fmt.Println("Failed to start server", err)
		return
	}
}
