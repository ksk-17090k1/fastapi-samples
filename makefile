
LIBS_FILE = requirements.txt
LIBS_DEV_FILE = requirements-dev.txt

${LIBS_FILE}:
	touch ${LIBS_FILE}
	echo "pydantic" >> ${LIBS_FILE}

${LIBS_DEV_FILE}:
	touch ${LIBS_DEV_FILE}
	echo "pytest" >> ${LIBS_DEV_FILE}
	echo "ruff" >> ${LIBS_DEV_FILE}
	echo "mypy" >> ${LIBS_DEV_FILE}
	echo "tuna" >> ${LIBS_DEV_FILE}
	echo "ipykernel" >> ${LIBS_DEV_FILE}

.venv:
	@echo "Create .venv"
	@python3 -m venv .venv
	make update

update: .venv ${LIBS_FILE} ${LIBS_DEV_FILE}
	@. .venv/bin/activate \
	&& pip install -r ${LIBS_FILE} \
	&& pip install -r ${LIBS_DEV_FILE}

# --- poetry ---

pj_name = backend
src_name = src

# at first
pipx_init:
	brew install pipx
	pipx ensurepath
	sudo pipx ensurepath --global
	@echo "✨close terminal and run 'make poetry.toml'✨"

# at second
pt_init:
	pipx install poetry
	poetry new ${pj_name}
	cd ${pj_name} && mv ${pj_name} ${src_name}
	@echo "✨ if you don't need the package mode, add 'package-mode = false' in [tool.poetry] section. ✨"

pt_install:
	cd ${pj_name} && poetry install

# at third
pt_set:
	cd ${pj_name} \
	&& mkdir .venv \
	&& poetry add pydantic \
	&& poetry add pytest --group dev \
	&& poetry add mypy --group dev \
	&& poetry add ruff --group dev \
	&& poetry add tuna --group dev \
	&& poetry add ipykernel --group dev

pt_update:
	cd ${pj_name} \
	&& rm poetry.lock \
	&& poetry install

file = main.py
out = prof.txt

tuna:
	poetry run python -X importtime ${file} 2> ${out}
	poetry run tuna ${out}	

.PHONY: pipx_init pt_init pt_install pt_set pt_update tuna