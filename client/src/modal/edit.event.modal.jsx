import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function EditEventModal({ isOpen, onClose, onEditSubmit, registerEdit, errorsEdit, handleDelete, watchEdit }) {

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Evento</DialogTitle>
      <form onSubmit={onEditSubmit}>
        <DialogContent>
          <TextField
            {...registerEdit("nameActivity")}
            label="Nome"
            fullWidth
            margin="normal"
            error={!!errorsEdit.nameActivity}
            helperText={errorsEdit.nameActivity?.message}
          />
          <TextField
            {...registerEdit("description")}
            label="Descrição"
            fullWidth
            margin="normal"
            error={!!errorsEdit.description}
            helperText={errorsEdit.description?.message}
          />
          <TextField
            {...registerEdit("dateStart")}
            label="Data Início"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            error={!!errorsEdit.dateStart}
            helperText={errorsEdit.dateStart?.message}
          />
          <TextField
            {...registerEdit("dateEnd")}
            label="Data Fim"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            error={!!errorsEdit.dateEnd}
            helperText={errorsEdit.dateEnd?.message}
          />
          <FormControl fullWidth margin="normal" error={!!errorsEdit.status}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              {...registerEdit("status")}
              labelId="status-label"
              id="status"
              label="Status"
              value={watchEdit("status")}
            >
              <MenuItem value="pendente">Pendente</MenuItem>
              <MenuItem value="concluido">Concluído</MenuItem>
              <MenuItem value="cancelado">Cancelado</MenuItem>
            </Select>
            {errorsEdit.status?.message && <div className="MuiFormHelperText-root Mui-error">{errorsEdit.status?.message}</div>}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>DELETAR</Button>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">Salvar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}