from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configuração do banco: substitua pelos seus dados
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://db_agendamento_user:wY2gHIU4WEMv3wBoVYRTYAJ8snuIrQBI@dpg-d14ppmmuk2gs73cgn1i0-a/db_agendamento'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

from models import Agendamento

@app.route('/agendamentos', methods=['POST'])
def criar_agendamento():
    data = request.get_json()
    nome = data['nome']
    sala = data['sala']
    data_agendamento = data['data']
    hora_inicial = data['hora_inicial']
    hora_final = data['hora_final']

    # Verifica conflito
    conflitos = Agendamento.query.filter_by(data=data_agendamento, sala=sala).all()
    for ag in conflitos:
        if not (hora_final <= ag.hora_inicial or hora_inicial >= ag.hora_final):
            return jsonify({'erro': 'Conflito: sala já agendada nesse horário'}), 400

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

@app.route('/agendamentos', methods=['GET'])
def listar_agendamentos():
    agendamentos = Agendamento.query.all()
    lista = []
    for ag in agendamentos:
        lista.append({
            'id': ag.id,
            'nome': ag.nome,
            'sala': ag.sala,
            'data': ag.data,
            'hora_inicial': ag.hora_inicial,
            'hora_final': ag.hora_final
        })
    return jsonify(lista)

if __name__ == '__main__':
    app.run(debug=True)