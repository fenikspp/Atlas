module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = async (req, res) => {
        const team = { ...req.body }

        if(req.params.id) team.idTeam = req.params.id

        try {
            existsOrError(team.name, 'Nome do time não informado!')
            existsOrError(team.supervisor, 'Informe um supervisor')

            const teamFromDB = await app.db('atlas.teams')
                .where({ name: team.name }).first()
            if (!team.idTeam) {
                notExistsOrError(teamFromDB, 'Time já cadastrado!')
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (team.idTeam) {
            app.db('atlas.teams')
                .update(team)
                .update({ updated_at: new Date() })
                .where({ idTeam: team.idTeam })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('atlas.teams')
                .insert(team)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
        
    }

    const get = async (req, res) => {
        app.db('atlas.teams')
            .select('teams.idTeam as codigo', 'teams.name as nome', 'employees.name as supervisor')
            .join('atlas.employees', 'teams.supervisor', 'employees.idemployees')
            .then(teams => res.json(teams))
            .catch(err => res.status(500).send(err))
    } 

    const getById = async (req, res) => {
        app.db('atlas.teams')
            .select('teams.idTeam as codigo', 'teams.name as nome', 'employees.name as supervisor')
            .join('atlas.employees', 'teams.supervisor', 'employees.idemployees')
            .where({ idTeam: req.params.id })
            .then(teams => res.json(teams))
            .catch(err => res.status(500).send(err))
    }

    return { save, get, getById }

}
