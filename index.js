var express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
var {buildSchema} = require('graphql')

var schema= buildSchema(`

type User{
    id:Int
    username:String
    preferredGengres:String

}

type Movie{
    id:Int
    title:String
    gengre:String
    description:String
}
type Preferences{
    userid:Int
    preferences:String

}

type Recomended{
    userId:Int
    idMovie:Int
    Gengre:String

}

type Query{
    movies:[Movie]
    movie(id:Int):Movie
    users:[User]
    user(id:Int):User



}


type Mutation{
    addUser(username:String,preferredGengres:String):User
    addMovie(title:String,gengre:String,description:String):Movie

    setPreferences(userid:Int,preferences:String):Preferences


    
}

`); 


var users = [];
var counter =1

var root={
    users:()=>{return users;},
    user:(data)=>{
        for (var i=0; i<users.length;i++)
              if(users[i].id==data.id)
                   return users[i];
        return null;

    },

    addUser:(data)=>{
        var c = {id:counter,'username':data.username,'preferredGengres':data.preferredGengres};
        users.push(c);
        counter++;
        return c;
    },

    movies:()=>{return movies;},
    movie:(data)=>{
        for (var i=0; i<movies.length;i++)
              if(movies[i].id==data.id)
                   return movies[i];
        return null;

    },
    addMovie:(data)=>{
        var d = {id:counter,'title':data.title,'gengre':data.gengre,'description':data.description};
        users.push(d);
        counter++;
        return d;
    },


    preferences:()=>{return preferences;},
    preference:(data)=>{
        for (var i=0; i<preferences.length;i++)
              if(preferences[i].userid==data.userid)
                   return preferences[i];
        return null;

    },
    setPreferences :(data)=>{
        var e = {'userid':data.userid,'preferences':data.preferences};
        users.push(e);
        counter++;
        return e;
    },

};

var app=express();
app.use('/graphql', graphqlHTTP({
    schema:schema,
    rootValue:root,
    graphiql:true,
}));
app.listen(4000);
console.log("Runing GRAPHQL API MOVIES")