const fs = require('fs');
const http = require('http');

http.get( 'http://jservice.io/api/categories?count=100', ( res ) => {
    if ( res.statusCode === 200 ) {
        res.setEncoding( 'utf-8' )

        let raw = ''
        res.on( 'data', (d) => { raw += d } )
        res.on( 'end', () => {
            try {
                let tame = raw.split('},{').join('}\n{')
                fs.writeFileSync( 'category.json', tame )
            } catch ( e ) {
                console.error( e.message )
            }
        } ).on( 'error', ( e ) => {
            console.error( 'Got error: ${ e.message }' )
        } )
    }
} )
