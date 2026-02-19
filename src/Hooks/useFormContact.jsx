import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export default function useFormContact() { 
    const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    message: yup.string().required("Message is required"),
});

    const { register, handleSubmit, formState:{errors }, } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
        alert("Message sent successfully!");
    };

    return { register, handleSubmit, errors, onSubmit };
}

