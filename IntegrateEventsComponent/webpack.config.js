config = {
   entry: './main.js',
	
   output: {
      path:'/Users/tcheedel/Downloads/CMAD/EventsComponent/target',
      filename: 'index.js',
   },
	
   devServer: {
      inline: true,
      port: 8080
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',            
            query: {
               presets: ['es2015', 'react']
            }
         },{
            test: /\.css?$/,
            loader: "style-loader!css-loader"
         }
      ]
   }
}

module.exports = config;