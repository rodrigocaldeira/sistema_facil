#!/bin/bash

kill_processes() {
	for p in "${pids[@]}"; do
		kill "$p";
	done
}

trap kill_processes EXIT
pids=()
go run main.go &
pids+=$!
cd ./front/sistema-facil
npm start

