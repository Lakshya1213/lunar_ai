from typing import Dict, Any, List
from .models import VirtualFile, PlanSpec, UnderstandingSpec

class ProjectContextManager:
    """
    Manages lightweight, high-signal project manifests to inject into LLM prompts
    without blowing up token budgets or causing context drift.
    """

    @staticmethod
    def build_manifest(
        app_name: str,
        domain: str,
        understanding: UnderstandingSpec = None,
        plan: PlanSpec = None,
        files: List[VirtualFile] = None,
        simulator_state: Dict[str, Any] = None,
        recent_modifications: List[str] = None
    ) -> Dict[str, Any]:
        manifest: Dict[str, Any] = {
            "appName": app_name,
            "domain": domain,
        }

        if understanding:
            manifest["problemStatement"] = understanding.problemStatement
            manifest["coreFeatures"] = [f.title for f in understanding.features if f.priority == "MVP"]
            manifest["targetPersonas"] = [p.name for p in understanding.targetAudience]

        if plan:
            manifest["screens"] = [f"{s.name} ({s.route})" for s in plan.screens]
            manifest["databaseTables"] = [t.tableName for t in plan.databaseSchema]
            manifest["techStack"] = [f"{ts.category}: {ts.technology}" for ts in plan.techStack]
            manifest["apiRoutes"] = [f"{ep.method} {ep.path}" for ep in plan.apiEndpoints]

        if files:
            manifest["activeFiles"] = [f.path for f in files]

        if simulator_state:
            manifest["simulator"] = {
                "activeScreen": simulator_state.get("activeScreen", "home"),
                "isDarkMode": simulator_state.get("isDarkMode", True),
                "isVegOnly": simulator_state.get("isVegOnly", False),
                "cartItemCount": len(simulator_state.get("cart", [])),
                "orderStatus": simulator_state.get("orderStatus", "idle"),
            }

        if recent_modifications:
            manifest["recentChanges"] = recent_modifications[-3:]

        return manifest

    @staticmethod
    def format_manifest_for_prompt(manifest: Dict[str, Any]) -> str:
        lines = ["--- CURRENT PROJECT MANIFEST ---"]
        for key, value in manifest.items():
            if isinstance(value, list):
                lines.append(f"• {key}: {', '.join(str(v) for v in value)}")
            elif isinstance(value, dict):
                sub_items = [f"{k}={v}" for k, v in value.items()]
                lines.append(f"• {key}: {', '.join(sub_items)}")
            else:
                lines.append(f"• {key}: {value}")
        lines.append("--------------------------------")
        return "\n".join(lines)
