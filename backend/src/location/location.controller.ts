import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';

@Controller('locations')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get()
  findAll(@Query('search') search?: string) {
    return this.locationService.findAll(search);
  }

  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }
}