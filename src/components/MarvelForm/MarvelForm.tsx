import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux'
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { chooseName,
    chooseVillains,
    chooseAge,
    chooseSuperPower,
    chooseOrigin,
    chooseWeakness,
    chooseMovies } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';


interface MarvelFormProps{
    id?:string;
    data?:{};
}

interface MarvelState{
    name:string;
    villans:string;
    age:string;
    super_power:string;
    origin_summary:string;
    weakness:string;
    movies:string;
}

export const MarvelForm = (props:MarvelFormProps) => {
    const dispatch = useDispatch();
    let {marvelData, getData } = useGetData();
    const store = useStore();

    // How to select your State as a variable
    const name = useSelector<MarvelState>(state => state.name)
    const villans = useSelector<MarvelState>(state => state.villans)

    const { register, handleSubmit } = useForm({})
    const onSubmit = async (data:any, event:any) => {
        console.log(props.id)

        if( props.id!){
            await serverCalls.update(props.id!, data)
            console.log(`Updated: ${data.name} \nID: ${props.id}`)
            window.location.reload();
            event.target.reset()
        } else {
            dispatch(chooseName(data.name))
            dispatch(chooseVillains(data.villans))
            dispatch(chooseAge(data.age))
            dispatch(chooseSuperPower(data.super_power))
            dispatch(chooseOrigin(data.origin_summary))
            dispatch(chooseWeakness(data.weakness))
            dispatch(chooseMovies(data.movies))

            await serverCalls.create(store.getState())
            window.location.reload();
            event.target.reset();
        }
    }

    return(
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Hero Name</label>
                    <Input {...register('name')} name='name' placeholder='Spider-Man'/>
                </div>
                <div>
                    <label htmlFor="villans">Villain Name</label>
                    <Input {...register('villan')} name='villan' placeholder='Green Goblin'/>
                </div>
                <div>
                    <label htmlFor="age">Age</label>
                    <Input {...register('age')} name='age' placeholder='18'/>
                </div>
                <div>
                    <label htmlFor="super_power">Super Power</label>
                    <Input {...register('super_power')} name='super_power' placeholder='Spider Powers'/>
                </div>
                <div>
                    <label htmlFor="origin_summary">Origin</label>
                    <Input {...register('origin_summary')} name='origin_summary' placeholder='Spider Bite'/>
                </div>
                <div>
                    <label htmlFor="weakness">Weakness</label>
                    <Input {...register('weakness')} name='weakness' placeholder='Anti-Venom'/>
                </div>
                <div>
                    <label htmlFor="movies">Movie</label>
                    <Input {...register('movies')} name='movies' placeholder='Spider-Man'/>
                </div>
                <Button type='submit'> Submit </Button>
            </form>
        </div>
    )
}