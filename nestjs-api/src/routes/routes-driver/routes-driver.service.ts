import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RouteDriverDto } from '../dto/route-driver.dto';

@Injectable()
export class RoutesDriverService {
  constructor(private prismaService: PrismaService) {}

  processRoute(dto: RouteDriverDto) {
    return this.prismaService.routeDriver.upsert({
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
  }
}
