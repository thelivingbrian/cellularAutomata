package main

import (
	"fmt"
	"io"
	"net/http"
)

func getA(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("got /hello request\n")
	io.WriteString(w, "<html><body><h2>This is my website!</h2></body></html>")
	//io.WriteString(w, "<h2>Test</h2>\n")
}

func main() {
	fmt.Println("Attempting to start server...")
	http.HandleFunc("/hello", getA)
	fs := http.FileServer(http.Dir("../../assets/"))
	err := http.ListenAndServe(":9090", fs)
	if err != nil {
		fmt.Println("Failed to start server", err)
		return
	}
}
