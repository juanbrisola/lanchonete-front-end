import React from 'react';
import { Select } from 'mui-rff';
import currencyFormatter from 'currency-formatter'
import { MenuItem, Box, Typography } from '@material-ui/core';

export default class LancheSelect extends React.Component {
    render() {
        return (
            <Select name={`${this.props.fieldArrayName}.id`} variant="outlined" label="Selecione um lanche" style={{ width: 300 }} formControlProps={{ margin: 'normal' }}>
                {this.props.lanches.map(lanche => (
                    <MenuItem value={lanche.id} key={`lanche-${lanche.id}`}>
                        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'cent' }}>
                            <Box>
                                <Typography as="p">{lanche.nome} - {currencyFormatter.format(lanche.valor, { locale: 'pt-BR' })}</Typography>
                                <Typography variant="caption">{lanche.ingredientes.map(ingrediente => ingrediente.descricao).join(', ')}</Typography>
                            </Box>
                        </Box>
                    </MenuItem>
                ))}
            </Select>
        )
    }
}
