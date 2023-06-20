import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrito } from './entities/carrito.entity';
import { CarritoGame } from './entities/carrito-game.entity';
import { CreateCarritoDto, AddGameToCarritoDto, UpdatecarritoDto } from './dto/create-carrito.dto';
import { UserService } from '../users/users.service'; // Asegúrate de importar UserService
import { GamesService } from '../games/games.service';
@Injectable()
export class CarritoService {
  constructor(
    @InjectRepository(CarritoGame)
    private readonly carritoGameRepository: Repository<CarritoGame>,
    private readonly gameService: GamesService,
    @InjectRepository(Carrito)
    private readonly carritoRepository: Repository<Carrito>,
    private readonly userService: UserService, // Inyecta el servicio UserService
  ) {}

  async findOne(id: number) {
    return this.carritoRepository.findOne({ where: { id } });  }
    
    async findCarritoByUserId(userId: number): Promise<Carrito> {
      return this.carritoRepository.findOne({ where: { user: { id: userId } } });
      
    }
    async findCarritoByIdAndCompra(carritoId: number, compra: boolean): Promise<CarritoGame[] | undefined> {
      const carrito = await this.carritoRepository.findOne({
        where: {
          id: carritoId,
        },
      });
    
      if (!carrito) {
        return undefined; // Manejar el caso si el carrito no existe
      }
    
      const carritoGames = await this.carritoGameRepository.find({
        where: {
          carrito: carrito,
          compra: compra,
        },
      });
    
      if (carritoGames.length === 0) {
        return undefined; // Manejar el caso si no se encuentra ningún carritoGame con el valor de compra especificado
      }
    
      return carritoGames;
    }
    
    async createCarrito(createCarritoDto: CreateCarritoDto): Promise<Carrito> {
      const user = await this.userService.findById(createCarritoDto.userId);
      const carrito = new Carrito();
      carrito.user = user;
      carrito.games = []; // Si es necesario inicializar el array de juegos vacío
      return this.carritoRepository.save(carrito);
    }
    

    async updateCarrito(updateCarritoDto: UpdatecarritoDto) {
      const { carritoId, compra } = updateCarritoDto;
      // Obtener los carritoGame que coinciden con el carritoId y gameId
      const carritoGames = await this.carritoGameRepository.find({
        where: {
          carrito: { id: carritoId }
        },
      });
      if (!carritoGames.length) {
        // Manejar el caso si no se encuentran carritoGames
      }
      // Actualizar los datos de compra para cada carritoGame encontrado
      carritoGames.forEach((carritoGame) => {
        carritoGame.compra = compra;
      });
      // Guardar los cambios en la base de datos
      await this.carritoGameRepository.save(carritoGames);
    }

  async addGameToCarrito(addGameToCarritoDto: AddGameToCarritoDto) {
    const { carritoId, gameId } = addGameToCarritoDto;
  
    const carrito = await this.carritoRepository.findOne({ where: { id: carritoId } });
    const game = await this.gameService.findById(gameId);
  
    if (!carrito || !game) {
      // Manejar el caso si el carrito o el juego no existen
    }
  
    const carritoGame = new CarritoGame();
    carritoGame.carrito = carrito;
    carritoGame.gameId = gameId;
    return this.carritoGameRepository.save(carritoGame);
  }
  
  async deleteFromCarrito(deleteCarritoDto: AddGameToCarritoDto) {
    const { carritoId, gameId } = deleteCarritoDto;
  
    // Obtener el carritoGame que coincide con el carritoId y gameId
    const carritoGame = await this.carritoGameRepository.findOne({
      where: {
        carrito: { id: carritoId },
        game: { id: gameId },
      },
    });
  
    if (!carritoGame) {
      // Manejar el caso si no se encuentra el carritoGame
      throw new NotFoundException('No se encontró el elemento en el carrito');
    }
  
    // Eliminar el carritoGame de la base de datos
    await this.carritoGameRepository.remove(carritoGame);
  }
  
}