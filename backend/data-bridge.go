package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

type User struct {
	ID        int    `json:"id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
}

func getUserFromDatabase(id int) (*User, error) {
	// Replace this with a call to your database to retrieve the user with the given ID
	fmt.Println("Returning user object...")

	return &User{
		ID:        id,
		FirstName: "John",
		LastName:  "Doe",
		Email:     "john.doe@example.com",
	}, nil
}

func getUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Recieved Request!!")
	fmt.Println("Retrieving userID from request...")
	userIDStr := r.URL.Query().Get("id")
	fmt.Println("Converting userID to int...")
	userID, err := strconv.Atoi(userIDStr)
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}

	fmt.Println("Retrieving user object using userID...")
	user, err := getUserFromDatabase(userID)
	if err != nil {
		http.Error(w, "Error retrieving user", http.StatusInternalServerError)
		return
	}

	fmt.Println("Writing user object into JSON..")
	userJSON, err := json.Marshal(user)
	if err != nil {
		http.Error(w, "Error marshalling user to JSON", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	fmt.Println("Responding to request with generated JSON...")
	w.Write(userJSON)
	fmt.Println()
}

func main() {
	http.HandleFunc("/api/users", getUser)
	http.ListenAndServe(":8080", nil)
}
