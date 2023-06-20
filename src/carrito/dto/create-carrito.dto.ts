export class CreateCarritoDto {
  userId: number;
}

export class AddGameToCarritoDto {
  carritoId: number;
  gameId: number;
  compra = false;
}

export class UpdatecarritoDto {
  carritoId?: number;
  gameId?: number;
  compra?: boolean;
}
