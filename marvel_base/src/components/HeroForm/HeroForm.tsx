import React from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {useForm} from 'react-hook-form';
import { chooseName, choosePrice} from '../../redux/slices/rootSlice';
import {Input} from '../sharedComponents/Input';
import {Button} from '@mui/material';

import {server_calls} from '../../api';
import {useGetData} from '../../custom-hooks';


interface HeroFormProps {
    id?: string;
    data?: {}
}

interface HeroState {
    name: string;
    price: string;
}

export const HeroForm = (props:HeroFormProps) =>{
    const dispatch = useDispatch()
    const store  = useStore()
    let {heroData, getData} = useGetData();
    const name = useSelector<HeroState>(state => state.name)
    const price = useSelector<HeroState>(state => state.price)
    const { register, handleSubmit } = useForm({})
    
    const onSubmit = async (data:any, event:any) => {
        console.log(props.id)

        if(props.id!){
            await server_calls.update(props.id!, data)
            console.log(`Updated: ${data} ${props.id}`)
            window.location.reload()
            event.target.reset();
        } else {
            dispatch(chooseName(data.name))
            dispatch(choosePrice(data.price))
            await server_calls.create(store.getState())
            window.location.reload()
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Hero Name</label>
                    <Input {...register('name')} name="name" placeholder='Name' />
                </div>
                <div>
                    <label htmlFor="real_name">Real Name</label>
                    <Input {...register('real_name')} name="real_name" placeholder="Real Name"/>
                </div>
                <div>
                    <label htmlFor="powers_abilities">Powers and Abilities</label>
                    <Input {...register('powers_abilities')} name="powers_abilities" placeholder="Powers and Abilities"/>
                </div>
                <div>
                    <label htmlFor="first_appearance">First Appearance</label>
                    <Input {...register('first_appearance')} name="first_appearance" placeholder="First Appearancen"/>
                </div>
                <div>
                    <label htmlFor="books_series">Books and Series</label>
                    <Input {...register('books_series')} name="books_series" placeholder="Books and Series"/>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <Input {...register('description')} name="description" placeholder="Description"/>
                </div>
                <div>
                    <label htmlFor="teams">Teams</label>
                    <Input {...register('teams')} name="teams" placeholder="Teams"/>
                </div>
                <div>
                    <label htmlFor="max_speed">Max Speed</label>
                    <Input {...register('max_speed')} name="max_speed" placeholder="Max Speed"/>
                </div>
                <div>
                    <label htmlFor="weight">Weight</label>
                    <Input {...register('weight')} name="weight" placeholder="Weight"/>
                </div>
               
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}