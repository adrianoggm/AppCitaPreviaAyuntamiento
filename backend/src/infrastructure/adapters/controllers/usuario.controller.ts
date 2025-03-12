import { Controller, Post, Body, Get, Query } from "@nestjs/common";
import { CreateUsuarioDto } from "src/domain/dto/create-usuario.dto";
import { LoginUsuarioDto } from "src/domain/dto/login-usuario.dto";
import { Usuario } from "src/domain/entities/usuario.entity";
import { CreateUsuarioUseCase } from "src/application/use-cases/create-usuario.use-case";
import { BuscarUsuarioUseCase } from "src/application/use-cases/buscar-usuario.use-case";
import { LoginUsuarioUseCase } from "src/application/use-cases/login-usuario.use-case";

@Controller("api/usuario")
export class UsuarioController {
  constructor(
    private readonly createUsuarioUseCase: CreateUsuarioUseCase,
    private readonly buscarUsuarioUseCase: BuscarUsuarioUseCase,
    private readonly loginUsuarioUseCase: LoginUsuarioUseCase
  ) {}

  // Registro de usuario
  @Post("register")
  async register(
    @Body() createUsuarioDto: CreateUsuarioDto
  ): Promise<Usuario> {
    return await this.createUsuarioUseCase.execute(createUsuarioDto);
  }

  // Login de usuario: valida las credenciales y devuelve un token de sesión
  @Post("login")
  async login(
    @Body() loginUsuarioDto: LoginUsuarioDto
  ): Promise<{ token: string }> {
    return await this.loginUsuarioUseCase.execute(loginUsuarioDto);
  }

  // Búsqueda de usuario por nombre de usuario
  @Get()
  async findUsuarioByName(
    @Query("nombreusuario") nombreusuario: string
  ): Promise<Usuario | null> {
    return await this.buscarUsuarioUseCase.execute(nombreusuario);
  }
}

