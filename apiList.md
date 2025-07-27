# DevTinder APIs List

## authRouter
 - POST /signup
 - POST /login
 - POST /logout

## profileRouter
 - GET /profile/view
 - PATCH /profile/edit
 - PACTH /profile/password

## connectionRequestRouter 
 - POST /request/send/status/:userId  -  ignore, insterested,
 - POST /request/review/status/:requestId - accepeted, rejected


## userRouter 
 - GET /requests/received
 - GET /connection
 - GET /feed - Get you the profiles of other users on platform


 Status: ignore, insterested, accepeted, rejected
