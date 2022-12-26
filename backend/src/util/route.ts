/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, RequestHandler, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'

import { ResponseType } from '@api/index'

import { PromiseOptional } from './general'

type TypedRequestBody<T, U> = Request<ParamsDictionary, ResponseType<T>, U>

type TypedResponseBody<T> = Response<ResponseType<T>>

export const typedRequestHandler = <RES = undefined, REQ = undefined>(
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
