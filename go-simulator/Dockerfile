FROM golang:1.23.4-alpine3.21
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
CMD ["tail", "-f", "/dev/null"]
