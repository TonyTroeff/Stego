# Pydantic v2: BaseSettings moved to pydantic-settings package
from pydantic_settings import BaseSettings, SettingsConfigDict


class CorsSettings(BaseSettings):
    client_url: str
    allowed_methods: list

    # Pydantic v2: Config class replaced with model_config
    # case_sensitive=False allows uppercase env vars to match lowercase field names
    model_config = SettingsConfigDict(env_file=".env.cors", case_sensitive=False)


class AlgorithmSettings(BaseSettings):
    prefix: str
    suffix: str

    # Pydantic v2: Config class replaced with model_config
    # case_sensitive=False allows uppercase env vars to match lowercase field names
    model_config = SettingsConfigDict(env_file=".env.algorithm", case_sensitive=False)


class StorageSettings(BaseSettings):
    root_directory: str

    # Pydantic v2: Config class replaced with model_config
    # case_sensitive=False allows uppercase env vars to match lowercase field names
    model_config = SettingsConfigDict(env_file=".env.storage", case_sensitive=False)
