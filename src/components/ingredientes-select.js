import React from 'react';
import { Button, Typography, Box } from '@material-ui/core';
import { Field, FormSpy } from 'react-final-form';
import currencyFormatter from 'currency-formatter'

class Ingrediente extends React.Component {
    render() {
        const { descricao, valor, orderKey, fieldArrayName, fieldArrayOrder } = this.props;
        return (
            <Box style={{ width: 400 }}>
                <Typography>{descricao} - R$ {currencyFormatter.format(valor, { locale: 'pt-BR' })}</Typography>

                <Field
                  name={`${fieldArrayName}.ingredientes.${orderKey}.qt`}
                  render={fieldProps => (
                    <>
                      <FormSpy subscription={{ values: true }}>
                        {spyProps => (
                          <Button
                            style={{ minWidth: 20, height: 20 }}
                            variant="outlined"
                            disabled={!spyProps.values.lanches[fieldArrayOrder].id || fieldProps.input.value < 1}
                            onClick={() => fieldProps.input.onChange(Number(fieldProps.input.value) - 1)}
                          >
                            -
                          </Button>
                        )}
                      </FormSpy>
                      <Typography component="span" style={{ margin: '0 10px'}}>{fieldProps.input.value}</Typography>
                      <FormSpy subscription={{ values: true }}>
                        {spyProps => (
                          <Button
                            style={{ minWidth: 20, height: 20 }}
                            variant="outlined"
                            disabled={!spyProps.values.lanches[fieldArrayOrder].id}
                            onClick={() => fieldProps.input.onChange(Number(fieldProps.input.value) + 1)}
                          >
                            +
                          </Button>
                        )}
                      </FormSpy>
                    </>
                  )}
                />
            </Box>
        )
    }
}

export default class IngredientesSelect extends React.Component {
    render() {
        return (
          <Box>
            <Typography variant="h6" component="h3">Adicionais: </Typography>
            {this.props.ingredientes.map((ingrediente, key) => (
              <Ingrediente
                key={`ingrediente-${ingrediente.id}`}
                orderKey={key}
                {...ingrediente}
                fieldArrayOrder={this.props.fieldArrayOrder}
                fieldArrayName={this.props.fieldArrayName}
              />
            ))}
          </Box>
        )
    }
}