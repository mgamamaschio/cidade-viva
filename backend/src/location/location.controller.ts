import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';

@Controller('locations')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get('categories')
  findCategories() {
    return this.locationService.findCategories();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(id);
  }

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('category') category?: string,
  ) {
    return this.locationService.findAll(search, category);
  }

  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }
}