import { API } from 'aws-amplify';
import {apiName,path} from '../constants/constant'
import { Auth } from 'aws-amplify';

export var addevent = async(event) => {
    var cognitoid='';
    await Auth.currentUserInfo().then(response=>{cognitoid=response.id});
    const myinit={
        body: ({ 
            userid : cognitoid,
            name: event.name, 
            description : event.description,
            status:'Active',
            schedule:{
                start_time : event.schedule.start_time,
                end_time : event.schedule.end_time,
            },
        })
    }
    await API.post(apiName,path, myinit).then(response=> console.log(response))
}

export var updateevent = async(event) => {
    const myinit={
        body: ({ 
            eventid : event.eventid,
            name: event.name, 
            description : event.description,
            status:'Active',
            schedule:{
                start_time : event.schedule.start_time,
                end_time : event.schedule.end_time,
            },
        })
    }
    await API.put(apiName,path, myinit).then(response=> console.log(response))
}

export var deleteevent = async(event) => {
    const myinit={
        body: ({ 
            eventid : event.eventid,
        })
    }
    await API.del(apiName,path, myinit).then(response=> console.log(response))
}

export var getevents = async(event) => {
    var cognitoid='';
    await Auth.currentUserInfo().then(response=>{cognitoid=response.id});
    var events;
      await  API.get(apiName,path, {
            queryStringParameters: {  // OPTIONAL
            userid: cognitoid,
        },
      }).then(response =>{events=response.eventlist;})
    //   console.log(events);
    return events;
}
