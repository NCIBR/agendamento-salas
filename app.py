from datetime import datetime
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Função auxiliar para converter string de hora em objeto datetime.time
def str_to_time(hora_str):
    return datetime.strptime(hora_str, '%H:%M').time()

# Carrega as variáveis do .env
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configura a URL do banco
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
print("APP conectado a:", app.config['SQLALCHEMY_DATABASE_URI'])

# Verifica se a URI do banco foi carregada
if not app.config['SQLALCHEMY_DATABASE_URI']:
    raise RuntimeError("A variável DATABASE_URL não foi carregada. Verifique seu .env.")

db = SQLAlchemy(app)

# Modelo de agendamento
class Agendamento(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    sala = db.Column(db.String(50), nullable=False)
    data = db.Column(db.String(10), nullable=False)
    hora_inicial = db.Column(db.String(5), nullable=False)
    hora_final = db.Column(db.String(5), nullable=False)

# Cria as tabelas
with app.app_context():
    db.create_all()

# Rota para criar agendamento
@app.route('/agendamentos', methods=['POST'])
def criar_agendamento():
    data = request.get_json()
    nome = data['nome']
    sala = data['sala']
    data_agendamento = data['data']
    hora_inicial = data['hora_inicial']
    hora_final = data['hora_final']

    # Converte os horários para objetos datetime.time
    hora_ini = str_to_time(hora_inicial)
    hora_fim = str_to_time(hora_final)

    # Busca agendamentos na mesma data e sala
    conflitos = Agendamento.query.filter_by(data=data_agendamento, sala=sala).all()
    for ag in conflitos:
        ag_ini = str_to_time(ag.hora_inicial)
        ag_fim = str_to_time(ag.hora_final)

        # Verifica se há sobreposição de horários
        if hora_ini < ag_fim and hora_fim > ag_ini:
            return jsonify({'erro': 'Conflito: sala já agendada nesse horário'}), 400

    # Se não houver conflito, salva o agendamento
    novo = Agendamento(
        nome=nome,
        sala=sala,
        data=data_agendamento,
        hora_inicial=hora_inicial,
        hora_final=hora_final
    )
    db.session.add(novo)
    db.session.commit()

    return jsonify({'mensagem': 'Agendamento criado com sucesso'})

# Rota para listar agendamentos (com filtro opcional)
@app.route('/agendamentos', methods=['GET'])
def listar_agendamentos():
    data = request.args.get('data')
    sala = request.args.get('sala')

    query = Agendamento.query
    if data:
        query = query.filter_by(data=data)
    if sala:
        query = query.filter_by(sala=sala)

    agendamentos = query.all()
    lista = [{
        'id': ag.id,
        'nome': ag.nome,
        'sala': ag.sala,
        'data': ag.data,
        'hora_inicial': ag.hora_inicial,
        'hora_final': ag.hora_final
    } for ag in agendamentos]

    return jsonify(lista)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)