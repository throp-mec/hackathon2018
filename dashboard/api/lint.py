#!/usr/local/bin/python3
import sys
"""
    Getting the lint value for everything is simple-ish as well

    ./venv/bin/pylint google_feed.py | grep -Eo "Your code has been rated at ([0-9.]+)/" | grep -Eo "([0-9.]+)"

    this grabs the number of victory

    9.59

    And then add it to the script
"""

data_path = './linting.txt'

def get_linting():
    with open(data_path, 'r') as f:
        contents = f.read()
        return [ float(x) for x in contents.split('\n') if x ]

def write_linting(lint_value):
    with open(data_path, 'a') as f:
        f.write(f"{lint_value}\n")

def main():
    if len(sys.argv) < 2:
        return print(get_linting())

    write_linting(sys.argv[1])

if __name__ == "__main__":
    main()
