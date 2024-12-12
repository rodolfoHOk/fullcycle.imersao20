package internal

import (
	"context"
	"math"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Directions struct {
	Lat float64 `bson:"lat" json:"lat"`
	Lng float64 `bson:"lng" json:"lng"`
}

type Route struct {
	ID           string       `bson:"_id" json:"id"`
	Distance     int          `bson:"distance" json:"distance"`
	Directions   []Directions `bson:"directions" json:"directions"`
	FreightPrice float64      `bson:"freight_price" json:"freight_price"`
}

type FreightService struct{}

func NewFreightService() *FreightService {
	return &FreightService{}
}

func (fs *FreightService) Calculate(distance int) float64 {
	return math.Floor((float64(distance)*0.15+0.3)*100) / 100
}

type RouteService struct {
	ctx            context.Context
	mongo          *mongo.Client
	freightService *FreightService
}

func NewRouteService(mongo *mongo.Client, freightService *FreightService) *RouteService {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	return &RouteService{
		ctx:            ctx,
		mongo:          mongo,
		freightService: freightService,
	}
}

func (rs *RouteService) CreateRoute(route Route) (Route, error) {
	route.FreightPrice = rs.freightService.Calculate(route.Distance)

	update := bson.M{
		"$set": bson.M{
			"distance":      route.Distance,
			"directions":    route.Directions,
			"freight_price": route.FreightPrice,
		},
	}
	filter := bson.M{
		"_id": route.ID,
	}
	opts := options.Update().SetUpsert(true)

	_, err := rs.mongo.Database("routes").Collection("routes").UpdateOne(rs.ctx, filter, update, opts)
	if err != nil {
		return Route{}, err
	}

	return route, nil
}

func (rs *RouteService) GetRoute(id string) (Route, error) {
	var route Route
	filter := bson.M{
		"_id": route.ID,
	}

	err := rs.mongo.Database("routes").Collection("routes").FindOne(rs.ctx, filter).Decode(&route)
	if err != nil {
		return Route{}, err
	}

	return route, nil
}
