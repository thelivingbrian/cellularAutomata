package main

import (
	"fmt"
	"io"
	"net/http"
)

func getA(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("got / request\n")
	io.WriteString(w, "This is my website!\n")
}

func main() {
	fmt.Println("Attempting to start server...")
	http.HandleFunc("/hello", getA)
	//err := http.ListenAndServe(":9090", http.FileServer(http.Dir("../../assets")))
	err := http.ListenAndServe(":9090", nil)
	if err != nil {
		fmt.Println("Failed to start server", err)
		return
	}
}
