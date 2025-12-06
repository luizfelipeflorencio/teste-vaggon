import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function AddEventModal({ isOpen, onClose, onCreateSubmit, registerCreate, errorsCreate }) {
  console.log(registerCreate("status"))
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Adicionar Evento</DialogTitle>
      <form onSubmit={onCreateSubmit}>
        <DialogContent>
          <TextField
            {...registerCreate("nameActivity")}
            label="Nome"
            fullWidth
            margin="normal"
            error={!!errorsCreate.nameActivity}
            helperText={errorsCreate.nameActivity?.message}
          />
          <TextField
            {...registerCreate("description")}
            label="Descrição"
            fullWidth
            margin="normal"
            error={!!errorsCreate.description}
            helperText={errorsCreate.description?.message}
          />
          <TextField
            {...registerCreate("dateStart")}
            label="Data Início"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            error={!!errorsCreate.dateStart}
            helperText={errorsCreate.dateStart?.message}
          />
          <TextField
            {...registerCreate("dateEnd")}
            label="Data Fim"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            error={!!errorsCreate.dateEnd}
            helperText={errorsCreate.dateEnd?.message}
          />
          <FormControl fullWidth margin="normal" error={!!errorsCreate.status}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              {...registerCreate("status")}
              labelId="status-label"
              id="status"
              label="Status"
              value={registerCreate("status").value}
            >
              <MenuItem value="pendente">Pendente</MenuItem>
              <MenuItem value="concluido">Concluído</MenuItem>
              <MenuItem value="cancelado">Cancelado</MenuItem>
            </Select>
            {errorsCreate.status?.message && <div className="MuiFormHelperText-root Mui-error">{errorsCreate.status?.message}</div>}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">Salvar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}