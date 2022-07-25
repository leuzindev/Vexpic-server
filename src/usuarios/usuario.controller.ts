/* eslint-disable  */
import { Body, Controller, Get, HttpStatus, Param, Post,  } from "@nestjs/common";
import { NestResponse } from "src/core/http/nest-response";
import { NestResponseBuilder } from "src/core/http/nest-response-builder";
import { Usuario } from "./usuario.entity";
import { UsuarioService } from "./usuario.service";

@Controller('users')    
export class UsuarioController{
    
    //private usuarioService = new UsuarioService();  Injetado Abaixo
    constructor(private usuarioService: UsuarioService){}


    @Get(':nomeDeUsuario')
    public buscaPorNomeDeUsuario(@Param('nomeDeUsuario') nomeDeUsuario: string){
        const usuarioEncontrado = this.usuarioService.buscaPorNomeDeUsuario(nomeDeUsuario);
        return usuarioEncontrado;
    }

    @Post()
    public cria(@Body() usuario: Usuario): NestResponse {
        const usuarioCriado = this.usuarioService.cria(usuario);

        return new NestResponseBuilder()
            .comStatus(HttpStatus.CREATED)
            .comHeaders({
                'Location': `/users/${usuarioCriado.nomeDeUsuario}`
            })
            .comBody(usuarioCriado)
            .build();

        // res.status(HttpStatus.CREATED)
        //     .location(`/users/${usuarioCriado.nomeDeUsuario}`)
        //     .json(usuarioCriado);

    }
}