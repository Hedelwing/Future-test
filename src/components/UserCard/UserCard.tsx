import { Box, Card, Typography } from '@material-ui/core'
import React, { createRef, memo } from 'react'
import { IPerson } from '../../types'

type Props = {
    person: Omit<IPerson, 'id' | 'phone' | 'email'>
}

export default memo(({ person }: Props) => {
    const ref = createRef<HTMLDivElement>()

    React.useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, [ref, person])

    return <Card ref={ref}>
        <Box p={2}>
            <Typography gutterBottom>
                Выбран пользователь: <b>{`${person.firstName} ${person.lastName}`}</b>
            </Typography>
            <Typography gutterBottom>
                Описание: <b>{person.description || "нет данных"}</b>
            </Typography>
            <Typography gutterBottom>
                Адрес проживания: <b>{person.address?.streetAddress || "нет данных"}</b>
            </Typography>
            <Typography gutterBottom>
                Город: <b>{person.address?.city || "нет данных"}</b>
            </Typography>
            <Typography gutterBottom>
                Провинция/штат: <b>{person.address?.state || "нет данных"}</b>
            </Typography>
            <Typography gutterBottom>
                Индекс: <b>{person.address?.zip || "нет данных"}</b>
            </Typography>
        </Box>
    </Card>
})