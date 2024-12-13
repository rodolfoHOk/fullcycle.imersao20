import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RouteDriverDto } from '../dto/route-driver.dto';
import { RoutesDriverGateway } from './routes-driver.gateway';

@Injectable()
export class RoutesDriverService {
  constructor(
    private prismaService: PrismaService,
    private routesGateway: RoutesDriverGateway,
  ) {}

  async processRoute(dto: RouteDriverDto) {
    const routeDriver = await this.prismaService.routeDriver.upsert({
      where: { route_id: dto.route_id },
      include: {
        route: true, //eager loading
      },
      create: {
        route_id: dto.route_id,
        points: {
          set: {
            location: {
              lat: dto.lat,
              lng: dto.lng,
            },
          },
        },
      },
      update: {
        points: {
          push: {
            location: {
              lat: dto.lat,
              lng: dto.lng,
            },
          },
        },
      },
    });

    // const directions: DirectionsResponseData = routeDriver.route
    //   .directions as any;

    // const lastPoint =
    //   directions.routes[0].legs[0].steps[
    //     directions.routes[0].legs[0].steps.length - 1
    //   ];

    // if (
    //   lastPoint.end_location.lat === dto.lat &&
    //   lastPoint.end_location.lng === dto.lng
    // ) {
    //   //se tentar novamente ele vai preenchendo, seria importante dar reset ou não permitir tentar novamente
    //   await this.kafkaProducer.send({
    //     topic: 'route',
    //     messages: [
    //       {
    //         value: JSON.stringify({
    //           event: 'RouteFinished',
    //           ...routeDriver,
    //         }),
    //       },
    //     ],
    //   });
    //   return routeDriver;
    // }

    this.routesGateway.emitNewPoints({
      route_id: dto.route_id,
      lat: dto.lat,
      lng: dto.lng,
    });

    return routeDriver;
  }
}
