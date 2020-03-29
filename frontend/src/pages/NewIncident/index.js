import React, {useState} from 'react';
import './styles.css';

import {Link,useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api'
import logoImg from '../../assets/logo.svg';


export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, SetDescrition] = useState('');
    const [value, SetValue] = useState('');
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try{
            await api.post('incidents', data, {
                headers: {
                    authorization: ongId,
                }
            })

            history.push('/profile');
        }catch(err) {
            alert('Erro ao cadastrar caso, tente novamente.')
        }
    }

    return (
        <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="be the hero"/>

                <h1>cadastrar novo caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.
                </p>

                <Link to="/profile" className="back-link">
                <FiArrowLeft size="16" color="#E02041"/>
                Voltar para o Home</Link>
            </section>
            <form onSubmit={handleNewIncident}>
                <input placeholder=" Titulo do caso:"
                value={title}
                onChange={e => setTitle(e.target.value)}
                />
                <textarea placeholder=" descrição: " 
                value={description}
                onChange={e => SetDescrition(e.target.value)}
                />
                <input placeholder=" Valor em Reais:"
                value={value}
                onChange={e => SetValue(e.target.value)}
                />
               
                <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>
    </div>
    )
}