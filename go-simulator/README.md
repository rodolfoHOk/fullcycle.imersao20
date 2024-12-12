# Imersão FullStack FullCycle 20 - Nest.js API

## Tecnologias

- Go Lang
- Kafka

## Guia

### Events

RouteCreated: (consumer)

- id
- distance
- directions
  - lat
  - lng

FreightCalculated: (producer)

- route_id
- amount

DeliveryStarted: (consumer)

- route_id

DriverMoved: (producer)

- route_id
- lat
- lng
