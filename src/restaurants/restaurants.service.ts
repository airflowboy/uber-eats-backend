import { Injectable } from '@nestjs/common';
import { Restaurant } from './entities/restaurant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { UpdateRestaurantDto } from './dtos/update-restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
  ) {}

  getAll(): Promise<Restaurant[]> {
    return this.restaurants.find();
  }

  createRestaurant(
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    const restaurant = this.restaurants.create(createRestaurantDto);
    return this.restaurants.save(restaurant);
  }

  updateRestaurant(updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurants.update(updateRestaurantDto.id, {
      ...updateRestaurantDto.data,
    });
  }
}
