from app import app, db, Agendamento
print("SCRIPT conectado a:", app.config['SQLALCHEMY_DATABASE_URI'])
def delete_all_agendamentos():
    with app.app_context():
        try:
            print(f"Banco usado: {app.config['SQLALCHEMY_DATABASE_URI']}")
            agendamentos = db.session.query(Agendamento).all()
            print(f"Agendamentos encontrados: {len(agendamentos)}")

            for ag in agendamentos:
                print(f"Deletando: {ag.nome} - {ag.sala} - {ag.data}")
                db.session.delete(ag)

            db.session.commit()
            print(f"{len(agendamentos)} agendamentos apagados.")
        except Exception as e:
            db.session.rollback()
            print(f"Erro ao apagar agendamentos: {e}")

if __name__ == '__main__':
    delete_all_agendamentos()