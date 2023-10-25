package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("Attempting to start server...")
	err := http.ListenAndServe(":9090", http.FileServer(http.Dir("../../assets")))
	if err != nil {
		fmt.Println("Failed to start server", err)
		return
	}
}
