/* eslint-disable  */

import { ArgumentsHost, Catch, 
    ExceptionFilter,
     HttpException, HttpStatus } from "@nestjs/common";
import { AbstractHttpAdapter, HttpAdapterHost } from "@nestjs/core";


@Catch()
export class FiltroDeExecaoHTTP implements ExceptionFilter{

    private httpAdapater: AbstractHttpAdapter

    constructor(adapaterHost: HttpAdapterHost){
        this.httpAdapater= adapaterHost.httpAdapter
    }

    catch(exception: Error, host: ArgumentsHost) {
        const contexto = host.switchToHttp();
        const requisicao = contexto.getRequest();
        const resposta = contexto.getResponse();

        const { status, body } = exception instanceof HttpException
            ? {
                status: exception.getStatus(),
                body: exception.getResponse()
            }
            : {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                body: {
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    timestamp: new Date().toISOString(),
                    path: requisicao.path
                }
            };
            this.httpAdapater.reply(resposta, body, status)
    }
}