
const { Unit } = require('../cyber-builder')



class KubApp extends Unit {

  static configSchema = {
    
  }

  async init() {
    console.log(this.config)
    return true
  }

  async execute(data, params) {
    console.log(this.config)
    let rv = yaml.stringify({ aaa: 1, bbb: "dsdsd", ccc: { dfddf: 2 } })
    console.log(rv)
  }

}




const hooks = {
  afterBuild: async (buildedUnit) => {

    let result = {}

    const { app } = buildedUnit.units
    
    const appmodel = await app.execute()

    console.log('appmodel', appmodel)

  }
}



const buildConfig = {
  Units: {
    KubApp
  },

  hooks,
  "build": {

    "units": {
      "app:KubApp": {

      }
    }
  }
}

module.exports = buildConfig

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
