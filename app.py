from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Configuração do banco: usa DATABASE_URL do Render ou fallback para SQLite local
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///local.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Modelo do agendamento
class Agendamento(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    sala = db.Column(db.String(50), nullable=False)
    data = db.Column(db.String(10), nullable=False)           # YYYY-MM-DD
    hora_inicial = db.Column(db.String(5), nullable=False)    # HH:MM
    hora_final = db.Column(db.String(5), nullable=False)      # HH:MM

# Rota para criar agendamento
@app.route('/agendamentos', methods=['POST'])
def criar_agendamento():
    data = request.get_json()
    try:
        agendamento = Agendamento(
            nome=data['nome'],
            sala=data['sala'],
            data=data['data'],
            hora_inicial=data['hora_inicial'],
            hora_final=data['hora_final']
        )
        db.session.add(agendamento)
        db.session.commit()
        return jsonify({'message': 'Agendamento criado com sucesso!'}), 201
    except Exception as e:
        print(f"Erro ao criar agendamento: {e}")
        return jsonify({'error': 'Erro ao criar agendamento.'}), 500

# Opcional: rota para listar todos os agendamentos (útil para testes)
@app.route('/agendamentos', methods=['GET'])
def listar_agendamentos():
    agendamentos = Agendamento.query.all()
    resultado = []
    for ag in agendamentos:
        resultado.append({
            'id': ag.id,
            'nome': ag.nome,
            'sala': ag.sala,
            'data': ag.data,
            'hora_inicial': ag.hora_inicial,
            'hora_final': ag.hora_final
        })
    return jsonify(resultado)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Cria as tabelas no banco
    app.run(host='0.0.0.0', port=5000)