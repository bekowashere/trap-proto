#!/usr/bin/env bash
cd ./backend
find . -path "/migrations/.py" -not -name "__init__.py" -delete
find . -path "/migrations/.pyc"  -delete
find . -path "*/__pycache__/"  -delete
find . -path "**/__pycache__"  -delete