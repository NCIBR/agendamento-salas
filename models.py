from app import db

class Agendamento(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    sala = db.Column(db.String(50), nullable=False)
    data = db.Column(db.String(10), nullable=False)          # formato 'DD-MM-YYYY'
    hora_inicial = db.Column(db.String(5), nullable=False)   # formato 'HH:MM'
    hora_final = db.Column(db.String(5), nullable=False)     # formato 'HH:MM'

    def __repr__(self):
        return f'<Agendamento {self.nome} - {self.sala} - {self.data} {self.hora_inicial}-{self.hora_final}>'