import React, { useState, useEffect, createContext} from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext =createContext();

const GithubProvider =({children})=>{
    const [gitHubUser,setGithubUser]=useState(mockUser);
    const [repos,setRepos]=useState(mockRepos);
    const [followers,setFollowers]=useState(mockFollowers);

    //request loading
    const [requests,setRequests]=useState(0);
    const [isLoading,setIsLoading]=useState(false);

    //! ERRORS
    const [error,setError]=useState({show:false,msg:''})

    //TODO serach GithubUser
    const searchGithubUser =async(user)=>{
        toggleError();
        setIsLoading(true);

        const response = await axios(`${rootUrl}/users/${user}`)
        .catch(error=>{

        })
        if (response){
            setGithubUser(response.data);
            const {login,followers_url}=response.data;

            await Promise.allSettled([axios(`${rootUrl}/users/${login}/repos?per_page=100`),
            axios(`${followers_url}?per_page=100`)])
            .then((results)=>{
                const [repos,followers] = results;
                const status = 'fulfilled';
                {repos.status === status && setRepos(repos.value.data)}
                {followers.status === status && setFollowers(followers.value.data)}
            }).catch(err => {
                console.log(err)
            })

            //repos
        }else{
            toggleError(true,"there is no user matching this username")}
            checkRequests();
            setIsLoading(false);
        }

    
    // check rate
    const checkRequests=()=>{
        axios(`${rootUrl}/rate_limit`)
        .then(({data})=>{
            let {rate:{remaining}}=data;
            setRequests(remaining);
            if(remaining === 0){
                toggleError(true,'Sorry, You have exceeded your hourly rate limit !!')
            }
        }).catch(err=>{
            
        })
    }

    function toggleError(show = false,msg= ''){
        setError({show,msg})
    };

    useEffect(checkRequests,[])
    return(
    <GithubContext.Provider 
    value={{gitHubUser,searchGithubUser,repos,followers,requests,error,isLoading}}>
        {children}
    </GithubContext.Provider>
    )
}

export {GithubProvider,GithubContext}