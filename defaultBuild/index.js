
let baseDefinitions = require('../definitions')


const unitsClasses = {
  Unit: baseDefinitions.Unit,
  KubApp: require('./units/KubApp')
}

const hooks = {
  afterBuild: async (buildedUnit) => {

    let result = {}

    const { app } = buildedUnit.units
    
    const appmodel = await app.execute()

    console.log('appmodel', appmodel)

  }
}


// const appConfig ={
//   "images": {

//   },

//   "routes": {
//     "auth": {
//       "image": ""
//       "port":
//     } 
  
//   }

// `apiVersion: networking.k8s.io/v1
// kind: Ingress
// metadata:
//   name: example-ingress
//   annotations:
//     nginx.ingress.kubernetes.io/rewrite-target: /$1
// spec:
//   rules:
//     - host: hello-world.info
//       http:
//         paths:
//           - path: /
//             pathType: Prefix
//             backend:
//               service:
//                 name: web
//                 port:
//                   number: 8080
// ``
// }

const buildConfig = {


  unitsClasses,
  hooks,
  "buildUnit":{
  
    "units": {
      // "params:KubParams": {},
      "app:KubApp": {

      }
    }
  }
}

module.exports = buildConfig