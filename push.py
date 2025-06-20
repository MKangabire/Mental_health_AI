from huggingface_hub import HfApi, create_repo

# Initialize the API
api = HfApi()

# Define repository details
repo_id = "21Meru/fine_tuned_blenderbot"
repo_type = "model"

# Create the repository if it doesn't exist
try:
    create_repo(repo_id=repo_id, repo_type=repo_type, private=False)  # Set private=True if you want a private repo
    print(f"Repository {repo_id} created successfully.")
except Exception as e:
    print(f"Repository creation skipped (may already exist): {e}")

# Upload the model and tokenizer directory
api.upload_folder(
    folder_path="./final_model/final",
    repo_id=repo_id,
    repo_type=repo_type,
    commit_message="Upload fine-tuned Blenderbot model and tokenizer"
)
print(f"Successfully uploaded model and tokenizer to {repo_id}")