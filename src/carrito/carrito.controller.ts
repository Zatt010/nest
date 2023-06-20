import { Controller, Get, Post, Put, Param, Body, ParseIntPipe, ParseBoolPipe, Delete, NotFoundException } from '@nestjs/common';
import { CarritoService } from './carrito.service';
import { CreateCarritoDto, AddGameToCarritoDto, UpdatecarritoDto } from './dto/create-carrito.dto';
import { Carrito } from './entities/carrito.entity';

@Controller('carrito')
export class CarritoController {
  constructor(private readonly carritoService: CarritoService) {}

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Carrito> {
    return this.carritoService.findOne(id);
  }
  // CarritoController
@Get('user/:userId')
async findCarritoByUserId(@Param('userId') userId: number): Promise<Carrito> {
  return this.carritoService.findCarritoByUserId(userId);
}
  @Post()
  create(@Body() createCarritoDto: CreateCarritoDto): Promise<Carrito> {
    return this.carritoService.createCarrito(createCarritoDto);
  }

  @Put('update')
  async updateCarrito(@Body() updateCarritoDto: UpdatecarritoDto) {
    try {
      await this.carritoService.updateCarrito(updateCarritoDto);
      return { success: true, message: 'Carrito actualizado correctamente' };
    } catch (error) {
      return { success: false, message: 'Ocurrió un error al actualizar el carrito' };
    }
  }

  @Delete(':carritoId/:gameId')
  async deleteFromCarrito(
    @Param('carritoId') carritoId: number,
    @Param('gameId') gameId: number,
  ) {
    const deleteCarritoDto: AddGameToCarritoDto = {
      carritoId,
      gameId,
      compra: false,
    };

    try {
      await this.carritoService.deleteFromCarrito(deleteCarritoDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Elemento no encontrado en el carrito');
      }
      throw error;
    }
  }
  
  @Post('add-game')
  addGameToCarrito(@Body() addGameToCarritoDto: AddGameToCarritoDto) {
    return this.carritoService.addGameToCarrito(addGameToCarritoDto);
  }
  @Get(':carritoId/compra/:compra')
  async findCarritoByIdAndCompra(
  @Param('carritoId', ParseIntPipe) carritoId: number,
  @Param('compra', ParseBoolPipe) compra: boolean,
) {
  const carritoGame = await this.carritoService.findCarritoByIdAndCompra(carritoId, compra);

  if (!carritoGame) {
    // Manejar el caso si no se encuentra un carritoGame con el valor de compra especificado
    // Devolver una respuesta adecuada, como un error 404 o un mensaje de error
  }

  // Devolver el carritoGame encontrado
  return carritoGame;
}

}

