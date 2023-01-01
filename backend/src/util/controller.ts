/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, RequestHandler, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'

import { ResponseType } from '@api/index'

import { PromiseOptional } from './general'


type TypedRequestBody<T, U> = Request<ParamsDictionary, ResponseType<T>, U>
type TypedResponseBody<T> = Response<ResponseType<T>>
export const controller = <RES = undefined, REQ = undefined>(
  func: (
    req: TypedRequestBody<RES, REQ>,
    res: TypedResponseBody<RES>,
    next: NextFunction
  ) => PromiseOptional<void | any>,
) => (
  (
    req: TypedRequestBody<RES, REQ>,
    res: TypedResponseBody<RES>,
    next: NextFunction,
  ) => {
    func(req, res, next)
  }
) as RequestHandler


type FileRequestBody<U> = Request<ParamsDictionary, Buffer, U>
type FileResponseBody = Response<Buffer>
export const fileController = <REQ = undefined>(
  func: (
    req: FileRequestBody<REQ>,
    res: FileResponseBody,
    next: NextFunction
  ) => PromiseOptional<void | any>,
) => (
  (
    req: FileRequestBody<REQ>,
    res: FileResponseBody,
    next: NextFunction,
  ) => {
    func(req, res, next)
  }
) as RequestHandler
